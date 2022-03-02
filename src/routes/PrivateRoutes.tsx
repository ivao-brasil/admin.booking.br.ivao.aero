import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EventsPage } from '../pages/events/EventsPage';
import { HomePage } from '../pages/home/HomePage';
import { UsersPage } from '../pages/users/UsersPage';
import { SlotsPage } from '../pages/slots/SlotsPage';
import { Logout } from '../pages/Logout';

export const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:eventId/slots" element={<SlotsPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
};
