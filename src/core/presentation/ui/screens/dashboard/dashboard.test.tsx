import { render, screen } from '@testing-library/react';
import DashboardView from './dashboard.view';

test('Renders the join channel and the create channel menus', () => {
  render(<DashboardView/>);
  const joinChannel = screen.getByText("Join Channel");
  expect(joinChannel).toBeInTheDocument();
  const createChannel = screen.getByText("Create Channel");
  expect(createChannel).toBeInTheDocument();
});	
