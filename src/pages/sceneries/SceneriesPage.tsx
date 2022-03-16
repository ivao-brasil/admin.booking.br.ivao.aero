import { MainLayout } from '../../layouts/MainLayout';
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Box, Grid, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { SceneriesForm } from './components/SceneriesForm';
import { SceneriesList } from './components/SceneriesList';
import { Slot } from '../../types/Slot';
import { Button, CircularProgress } from '@mui/material';
import { CloudUpload } from '@material-ui/icons';
import { Download } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { IocContext } from '../../context/IocContext';
import { Confirm } from '../../components/Confirm';
import { NotificationContext, NotificationType } from '../../context/NotificationContext';
import { ONE_SECOND } from '../../constants';
import { useQueryClient } from 'react-query';
import { Scenery } from '../../types/Scenery';

export const SceneriesPage = () => {
  const eventId = Number(useParams().eventId);
  const [tabNumber, setTabNumber] = useState('1');
  const [editingScenery, setEditingScenery] = useState<Scenery>();
  const { token } = useContext(AuthContext);
  const { apiClient } = useContext(IocContext);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(NotificationContext);

  const [formData, setFormData] = useState<FormData>();
  const queryClient = useQueryClient();

  const onTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabNumber(newValue);
  };

  return (
    <MainLayout>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabNumber}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={onTabChange} aria-label="Scenary edit tabs">
              <Tab label="List" value="1" />
              <Tab label="Create" value="2" />
              <Tab label="Edit" value="3" disabled={tabNumber !== '3'} />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SceneriesList
              onEdit={scenery => {
                setTabNumber('3');
                setEditingScenery(scenery);
              }}
            />
          </TabPanel>
          <TabPanel value="2">
            <SceneriesForm onPersist={() => setTabNumber('1')} />
          </TabPanel>
          <TabPanel value="3">
            <SceneriesForm onPersist={() => setTabNumber('1')} defaultState={editingScenery} />
          </TabPanel>
        </TabContext>
      </Box>
    </MainLayout>
  );
};
