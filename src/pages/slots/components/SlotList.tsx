import { FlightLand, FlightTakeoff, People, Public } from '@mui/icons-material';
import { PrivacyTip } from '@mui/icons-material';
import { Button, Grid, Menu, MenuItem, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridMoreVertIcon } from '@mui/x-data-grid';
import { FunctionComponent, useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { Confirm } from '../../../components/Confirm';
import { AuthContext } from '../../../context/AuthContext';
import { IocContext } from '../../../context/IocContext';
import { NotificationContext, NotificationType } from '../../../context/NotificationContext';
import { Env } from '../../../env';
import { useSlots } from '../../../hooks/useSlots';
import { Slot } from '../../../types/Slot';
import { IconButton } from '@material-ui/core';

interface SlotListProp {
  onEdit: (slot: Slot) => void;
}

export const SlotList: FunctionComponent<SlotListProp> = ({ onEdit }) => {
  const eventId = Number(useParams().eventId);

  const { apiClient } = useContext(IocContext);
  const { token } = useContext(AuthContext);
  const { dispatch } = useContext(NotificationContext);

  const [deletingSlot, setDeletingSlot] = useState<Slot>();
  const [cancellingBooking, setCancellingBooking] = useState<Slot>();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Slot | null>(null);

  const queryClient = useQueryClient();

  const { slots, count, slotsLoading } = useSlots(eventId, page + 1, perPage);

  const handleMenuOpen = (event: any, row: any) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedRow(null);
  };

  const deleteSlot = useMutation((slot: Slot) => apiClient.deleteSlot(slot.id, token), {
    onSuccess: () => {
      setDeletingSlot(undefined);
      queryClient.invalidateQueries(['slots', eventId]);
      dispatch('Slot successfully deleted', 'Slot exclusion', NotificationType.SUCCESS, 5000);
    },
    onError: () => {
      dispatch('Error to exclude slot', 'Slot exclusion', NotificationType.ERROR, 5000);
    },
  });

  const cancelBooking = useMutation((slot: Slot) => apiClient.removeBooking(slot.id, token), {
    onSuccess: () => {
      setCancellingBooking(undefined);
      queryClient.invalidateQueries(['slots', eventId]);
      dispatch('Booking successfully cancelled', 'Booking cancelling', NotificationType.SUCCESS, 5000);
    },
    onError: () => {
      dispatch('Error to delete booking', 'Booking cancelling', NotificationType.ERROR, 5000);
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
      width: 120,
      field: 'company',
      headerName: 'Airline',
      editable: false,
      renderCell: data => {
        const flightNumber = data.row.flightNumber;

        if (!flightNumber) {
          return;
        }

        return (
          <img alt="airline logo" src={`${Env.IVAO_KRONOS_API_SERVER}/logo/airline/${data.row.flightNumber.substring(0, 3)}`} />
        );
      },
      filterable: true,
    },
    {
      width: 80,
      field: 'flightNumber',
      headerName: 'Callsign',
      editable: false,
      renderCell: data => data.row.flightNumber && (<b>{data.row.flightNumber}</b>),
      filterable: true,
    },
    {
      field: 'origin',
      headerName: 'DEP',
      editable: false,
      width: 70,
      filterable: true,
    },
    {
      field: 'destination',
      headerName: 'ARR',
      editable: false,
      width: 70,
      filterable: true,
    },
    {
      field: 'type',
      headerName: 'OPR',
      editable: false,
      filterable: false,
      renderCell: data => (
        <Tooltip title={`Type of operation: ${data.row.type === 'takeoff' ? 'Takeoff' : 'Landing'}`}>
          {data.row.type === 'takeoff' ? <FlightTakeoff fontSize="large" color="action" /> : <FlightLand fontSize="large" color="action" />}
        </Tooltip>
      ),
      width: 60,
    },
    {
      width: 60,
      field: 'private',
      headerName: 'Type',
      editable: false,
      filterable: false,
      renderCell: data => (
        <Tooltip title={`Type of slot: ${data.row.private ? 'Private' : 'Regular'}`}>
          {data.row.private ? <PrivacyTip fontSize="large" color="primary" /> : <Public fontSize="large" color="primary" />}
        </Tooltip>
      ),
    },
    {
      width: 100,
      field: 'slotTime',
      headerName: 'Slot Time',
      filterable: true,
      editable: false,
    },
    {
      field: 'gate',
      headerName: 'Gate',
      filterable: true,
      editable: false,
    },
    {
      field: 'owner',
      headerName: 'Owner',
      filterable: true,
      editable: false,
      width: 120,
      renderCell: data =>
        data.row.owner && (
          <Tooltip title={`${data.row.owner.firstName} ${data.row.owner.lastName} `}>
            <Button
              startIcon={<People />}
              variant="outlined"
              onClick={() => window.open(`https://www.ivao.aero/Member.aspx?id=${data.row.owner?.vid}`, '_blank')}>
              {data.row.owner.vid}
            </Button>
          </Tooltip>
        ),
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
            <IconButton
              size="small"
              onClick={(event) => handleMenuOpen(event, data.row)}
            >
              <GridMoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
      ),
    },
  ];

  // @ts-ignore
  return (
    <>
      <DataGrid
        columns={columns}
        rows={slots}
        disableSelectionOnClick
        pageSize={perPage}
        rowCount={count}
        onPageChange={setPage}
        density="comfortable"
        rowsPerPageOptions={[5, 10, 15, 25]}
        loading={slotsLoading}
        disableColumnSelector
        disableDensitySelector
        autoHeight
        onPageSizeChange={setPerPage}
        paginationMode="server"
        filterMode="client"
      />

      <Menu
        anchorEl={menuAnchorEl}
        open={menuAnchorEl !== null}
        onClose={handleMenuClose}
      >
        {selectedRow?.owner && (<MenuItem onClick={() => setCancellingBooking(selectedRow)}>Cancel Booking</MenuItem>)}
        <MenuItem onClick={() => onEdit(selectedRow!)}>Edit</MenuItem>
        <MenuItem onClick={() => setDeletingSlot(selectedRow!)}>Delete</MenuItem>
      </Menu>

      {deletingSlot && (
        <Confirm
          text={`Please confirm if you want do delete slot ${deletingSlot.origin} - ${deletingSlot.destination}?`}
          onConfirm={result => {
            setDeletingSlot(null);
            handleMenuClose();

            if (result) {
              deleteSlot.mutate(deletingSlot);
            }
          }}
        />
      )}

      {cancellingBooking && (
        <Confirm
          text={`Please confirm if you want do cancel the booking for slot ${cancellingBooking.origin} - ${cancellingBooking.destination}?`}
          onConfirm={result => {
            setCancellingBooking(null);
            handleMenuClose();

            if (result) {
              cancelBooking.mutate(cancellingBooking);
            }
          }}
        />
      )}
    </>
  );
};
