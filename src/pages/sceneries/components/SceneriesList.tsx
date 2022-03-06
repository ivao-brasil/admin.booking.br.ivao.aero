import { Button, Grid, Tooltip } from '@material-ui/core';
import { Delete, Edit, RemoveCircle, SupervisorAccount } from '@material-ui/icons';
import { FunctionComponent, useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { IocContext } from '../../../context/IocContext';
import { NotificationContext, NotificationType } from '../../../context/NotificationContext';
import { User } from '../../../types/User';
import { useMutation, useQueryClient } from 'react-query';
import { useUsers } from '../../../hooks/useUsers';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ConfirmUserBlock } from '../../../components/ConfirmUserBlock';
import { Scenery } from '../../../types/Scenery';
import { useScenaries } from '../../../hooks/useScenaries';
import { Confirm } from '../../../components/Confirm';

interface SceneriesListProp {
  onEdit: (scenery: Scenery) => void;
}

export const SceneriesList: FunctionComponent<SceneriesListProp> = ({ onEdit }) => {
  const { apiClient } = useContext(IocContext);
  const { token } = useContext(AuthContext);
  const { dispatch } = useContext(NotificationContext);

  const [deletingScenery, setDeletingScenery] = useState<Scenery>();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);

  const queryClient = useQueryClient();

  const { scenaries, count, scenariesLoading } = useScenaries(page + 1, perPage);

  const deleteScenery = useMutation((scenery: Scenery) => apiClient.deleteScenery(scenery.id, token), {
    onSuccess: () => {
      setDeletingScenery(undefined);
      queryClient.invalidateQueries(['scenaries']);
      dispatch('Scenery successfully deleted', 'Scenery exclusion', NotificationType.SUCCESS, 5000);
    },
    onError: () => {
      dispatch('Error to exclude scenery', 'Scenery exclusion', NotificationType.ERROR, 5000);
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      filterable: true,
      editable: false,
      width: 70,
    },
    {
      field: 'icao',
      headerName: 'ICAO',
      filterable: true,
      editable: false,
      width: 85,
    },
    {
      field: 'title',
      headerName: 'Title',
      filterable: true,
      editable: false,
      flex: 1
    },
    {
      field: 'license',
      headerName: 'License',
      filterable: true,
      editable: false,
      width: 140,
    },
    {
      field: 'link',
      headerName: 'Link',
      filterable: true,
      editable: false,
      flex: 1
    },
    {
      field: 'simulator',
      headerName: 'Simulator',
      filterable: true,
      editable: false,
      width: 120,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      filterable: false,
      editable: false,
      width: 250,
      renderCell: data => (
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="outlined" color="info" startIcon={<Edit />} onClick={() => onEdit(data.row)}>
              Edit
            </Button>
          </Grid>

          <Grid item>
            <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => setDeletingScenery(data.row)}>
              Delete
            </Button>
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <>
      <DataGrid
        columns={columns}
        rows={scenaries}
        disableSelectionOnClick
        pageSize={perPage}
        rowCount={count}
        onPageChange={setPage}
        density="comfortable"
        rowsPerPageOptions={[5, 10, 15, 25]}
        loading={scenariesLoading}
        disableColumnSelector
        disableDensitySelector
        autoHeight
        onPageSizeChange={setPerPage}
        paginationMode="server"
        filterMode="client"
      />

      {deletingScenery && (
        <Confirm
          text={`Please confirm if you want to delete this scenery`}
          onConfirm={result => {
            setDeletingScenery(undefined);

            if (result) {
              deleteScenery.mutate(deletingScenery);
            }
          }}
        />
      )}
    </>
  );
};
