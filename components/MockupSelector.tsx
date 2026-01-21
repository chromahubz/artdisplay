"use client";

import { motion } from "framer-motion";
import { Frame, Home, Grid3x3 } from "lucide-react";

interface MockupSelectorProps {
  selectedMockup: string;
  onSelectMockup: (mockup: string) => void;
}

const mockups = [
  {
    id: "frame1",
    name: "Classic Frame",
    icon: Frame,
    description: "Traditional gallery frame",
    preview: "bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800",
  },
  {
    id: "frame2",
    name: "Modern Frame",
    icon: Frame,
    description: "Contemporary black frame",
    preview: "bg-gradient-to-br from-gray-800 to-gray-900",
  },
  {
    id: "wall",
    name: "Gallery Wall",
    icon: Grid3x3,
    description: "Minimalist wall mount",
    preview: "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800",
  },
];

export default function MockupSelector({ selectedMockup, onSelectMockup }: MockupSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="px-4 py-3 glass rounded-2xl">
        <h2 className="text-lg font-semibold mb-1">Mockup Templates</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Choose your display style
        </p>
      </div>

      <div className="space-y-3">
        {mockups.map((mockup) => {
          const Icon = mockup.icon;
          const isSelected = selectedMockup === mockup.id;

          return (
            <motion.button
              key={mockup.id}
              onClick={() => onSelectMockup(mockup.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full rounded-2xl text-left transition-all relative
                ${isSelected
                  ? 'bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-2 border-purple-500 dark:border-purple-400'
                  : 'glass hover:bg-gray-50 dark:hover:bg-gray-800/50 border-2 border-transparent'
                }
              `}
            >
              <div className="p-4 flex items-center gap-4">
                <div className={`
                  w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm
                  ${mockup.preview}
                `}>
                  <Icon className={`
                    w-8 h-8
                    ${mockup.id === 'frame2' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}
                  `} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1 flex items-center gap-2">
                    {mockup.name}
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {mockup.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Tips section */}
      <div className="px-4 py-3 glass rounded-2xl">
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <span className="text-xs text-white">💡</span>
          </div>
          Pro Tips
        </h3>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Drag corners for 3D perspective</li>
          <li>• Works best with square artwork</li>
          <li>• Export in high resolution</li>
        </ul>
      </div>
    </div>
  );
}
