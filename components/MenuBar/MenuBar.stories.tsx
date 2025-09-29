import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MenuBar from './MenuBar';

const meta: Meta<typeof MenuBar> = {
  title: 'Components/MenuBar',
  component: MenuBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        height: '100px',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed in the menu bar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'My Portfolio',
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Custom Menu Title',
  },
};