'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Section } from '@/types';
import SectionEditor from './SectionEditor';

interface SortableSectionProps {
  section: Section;
  onUpdate: (section: Section) => void;
  onDelete: () => void;
}

export default function SortableSection({
  section,
  onUpdate,
  onDelete,
}: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : ('auto' as const),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <SectionEditor
        section={section}
        onUpdate={onUpdate}
        onDelete={onDelete}
        dragHandleProps={listeners}
      />
    </div>
  );
}
