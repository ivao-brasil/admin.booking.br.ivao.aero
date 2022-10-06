import { Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, styled, Tooltip, Typography } from '@material-ui/core';
import { Delete, Edit, EventNote, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { FunctionComponent, useState } from 'react';
import { Event } from '../../../types/Event';

interface EventCardProps {
  event: Event;
  onEdit?: (event: Event) => void;
  onDelete?: (event: Event) => void;
  slotRedirection?: (event: Event) => void;
  onReportRequest?: (event: Event) => void;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const months = ['Jannuary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const EventCard: FunctionComponent<EventCardProps> = ({ event, onEdit, onDelete, slotRedirection, onReportRequest }) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (date: Date) => {
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const day = date.getUTCDate();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${month} ${day}, ${year} ${hours}${minutes}Z`;
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={event.eventName} subheader={formatDate(new Date(event.dateStart))} />
      <CardMedia component="img" image={event.banner} />

      <CardActions disableSpacing>
        {onEdit && (
          <IconButton aria-label="edit" onClick={() => onEdit(event)}>
            <Edit />
          </IconButton>
        )}

        {onDelete && (
          <Tooltip title={`Delete ${event.eventName}`}>
            <IconButton aria-label="delete" onClick={() => onDelete(event)}>
              <Delete />
            </IconButton>
          </Tooltip>
        )}

        {slotRedirection && (
          <Tooltip title={`View ${event.eventName} Slots`}>
            <IconButton aria-label="View slots" onClick={() => slotRedirection(event)}>
              <EventNote />
            </IconButton>
          </Tooltip>
        )}

        {onReportRequest && (
          <Tooltip title={event.has_ended
             ? `Download ${event.eventName} Report`
             : 'Download is enabled only for finished events'}
          >
            <div>
              <IconButton
                aria-label="download report"
                disabled={!event.has_ended}
                onClick={() => onReportRequest(event)}
              >
                <FileDownloadIcon />
              </IconButton>
            </div>
          </Tooltip>
        )}

        <ExpandMore expand={expanded} onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {event.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
