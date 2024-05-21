import { render, screen } from '@testing-library/react';
import { DashboardContainer } from './dashboard.container';

/**
 * Given: Dashboard Container
 * Expect: Needed elements are shown
 */
describe('Test dashboard container', () => {

   test('renders create channel component', () => {
      // Arrange
      // Render Dashboard Container
      render(<DashboardContainer />)

      // Act
      // Check if the Create Channel element is rendered
      const createChannelElement = screen.getByText("Create Channel");

      // Assert
      // Assert that the element that we are looking for exists
      expect(createChannelElement).toBeInTheDocument();
   });

   test('renders join channel component', () => {
      // Arrange
      // Render Dashboard Container
      render(<DashboardContainer />)

      // Act
      // Check if the Join Channel element is rendered
      const joinChannelElement = screen.getByText("Join Channel");

      // Assert
      // Assert that the element that we are looking for exists
      expect(joinChannelElement).toBeInTheDocument();
   });
})