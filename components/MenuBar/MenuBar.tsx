'use client';

interface MenuBarProps {
  title?: string;
}

export default function MenuBar({ title = "Menu Bar" }: MenuBarProps) {
  return (
    <div className="w-full h-8 fixed top-0 left-0 flex justify-between items-center bg-[#F4F9E5] border-b-3 border-solid border-[#1E1E1E] px-4 font-mono">
      <div className="font-semibold text-gray-800">{title}</div>
      <div className="flex items-center space-x-4">
        {/* Add menu items here */}
      </div>
    </div>
  );
}