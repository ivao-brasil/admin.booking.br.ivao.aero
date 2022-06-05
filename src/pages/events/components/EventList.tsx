import { Grid, Box, Button } from '@material-ui/core';
import { FunctionComponent, useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Confirm } from '../../../components/Confirm';
import { AuthContext } from '../../../context/AuthContext';
import { IocContext } from '../../../context/IocContext';
import { NotificationContext, NotificationType } from '../../../context/NotificationContext';
import { useEvents } from '../../../hooks/useEvents';
import { Event } from '../../../types/Event';
import { EventCard } from './EventCard';

interface EventListProps {
  onEdit: (event: Event) => void;
}

export const EventList: FunctionComponent<EventListProps> = ({ onEdit }) => {
  const { apiClient } = useContext(IocContext);
  const { token } = useContext(AuthContext);
  const { dispatch } = useContext(NotificationContext);
  const [confirm, setConfirm] = useState(false);
  const [event, setEvent] = useState<Event>();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [page] = useState(0);
  const perPage = 6;

  const { events, fetchNextPage, hasNextPage, isLoading } = useEvents(page + 1, perPage);

  const deleteEvent = useMutation((event: Event) => apiClient.deleteEvent(event, token), {
    onSuccess: () => {
      dispatch('Event successfully deleted', 'Success', NotificationType.SUCCESS, 5000);
      queryClient.invalidateQueries('events');
    },
    onError: () => {
      dispatch('Error to delete event', 'Deletion Error', NotificationType.ERROR, 5000);
    },
  });

  const onDelete = (event: Event) => {
    setConfirm(true);
    setEvent(event);
  };

  return (
    <div>
      {confirm && (
        <Confirm
          text={`Please confirm if you want to delete event ${event?.eventName}`}
          onConfirm={result => {
            if (event && result) {
              deleteEvent.mutate(event);
            }
            setConfirm(false);
          }}
          deletion={true}
        />
      )}
      <Grid container spacing={2}>
        {!isLoading &&
          events.map(event => (
            <Grid item xs={4} key={event.id}>
              <EventCard event={event} onEdit={onEdit} onDelete={onDelete} slotRedirection={event => navigate(`/events/${event.id}/slots`)} />
            </Grid>
          ))}
      </Grid>
      {hasNextPage && (
        <Box textAlign='center' marginTop={2}>
          <Button onClick={() => fetchNextPage()} disabled={isLoading}>
            Load more
          </Button>
        </Box>
      )}
    </div>
  );
};
