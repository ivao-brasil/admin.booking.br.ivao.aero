import { Box, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { Scenery } from '../../types/Scenery';
import { SceneriesForm } from './components/SceneriesForm';
import { SceneriesList } from './components/SceneriesList';

export const SceneriesPage = () => {
  const [tabNumber, setTabNumber] = useState('1');
  const [editingScenery, setEditingScenery] = useState<Scenery>();

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
