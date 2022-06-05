import { Button } from '@material-ui/core';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { FunctionComponent, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '../../../context/AuthContext';
import { IocContext } from '../../../context/IocContext';
import { NotificationContext, NotificationType } from '../../../context/NotificationContext';
import { Scenery } from '../../../types/Scenery';

interface ISceneryForm {
  title: string;
  license: string;
  link: string;
  simulator: string;
  icao: string;
}

interface ISceneryFormProps {
  defaultState?: Scenery;
  onPersist: () => void;
}

export const SceneriesForm: FunctionComponent<ISceneryFormProps> = ({ defaultState, onPersist }) => {
  const { register, handleSubmit, watch, reset } = useForm<ISceneryForm>({
    defaultValues: defaultState,
  });

  const { license, simulator } = watch();

  const { apiClient } = useContext(IocContext);
  const { token } = useContext(AuthContext);
  const { dispatch } = useContext(NotificationContext);

  const queryClient = useQueryClient();

  const createScenery = useMutation((data: ISceneryForm) => apiClient.createScenery(data, token), {
    onSuccess: () => {
      queryClient.invalidateQueries(['scenaries']);
      onPersist();
      reset();
      dispatch('Scenery successfully created', 'Scenery created', NotificationType.SUCCESS, 5000);
    },
    onError: () => {
      dispatch('Error to create scenery', 'Scenery creation error', NotificationType.ERROR, 5000);
    },
  });

  const updateScenery = useMutation((data: ISceneryForm) => apiClient.updateScenery(Number(defaultState?.id), data, token), {
    onSuccess: () => {
      queryClient.invalidateQueries(['scenaries']);
      onPersist();
      reset();
      dispatch('Scenery successfully updated', 'Scenery update', NotificationType.SUCCESS, 5000);
    },
    onError: () => {
      dispatch('Error to update scenery', 'Scenery creation error', NotificationType.ERROR, 5000);
    },
  });

  const onSubmit = (data: ISceneryForm) => {
    if (!defaultState) {
      return createScenery.mutate(data);
    }

    return updateScenery.mutate(data);
  };

  return (
    <section>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          width: '100%',
        }}
        onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Title" {...register('title', { required: true })} />
        <TextField label="Link" {...register('link', { required: true })} />
        <TextField label="ICAO" {...register('icao', { required: true, maxLength: 4 })} />
        <FormControl>
          <InputLabel>Simulator</InputLabel>
          <Select value={simulator || ''} label="Simulator" variant="outlined" {...register('simulator', { required: true })}>
            <MenuItem value="fs9">FS9</MenuItem>
            <MenuItem value="fsx">FSX</MenuItem>
            <MenuItem value="p3d">P3D</MenuItem>
            <MenuItem value="xp11">XP11</MenuItem>
            <MenuItem value="msfs">MSFS</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>License</InputLabel>
          <Select value={license || ''} label="Simulator" variant="outlined" {...register('license', { required: true })}>
            <MenuItem value="freeware">Freeware</MenuItem>
            <MenuItem value="payware">Payware</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
    </section>
  );
};
