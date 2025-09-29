import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Wallpaper from './Wallpaper';

const meta: Meta<typeof Wallpaper> = {
  title: 'Components/Wallpaper',
  component: Wallpaper,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      story: {
        height: '400px',
      },
    },
  },
};