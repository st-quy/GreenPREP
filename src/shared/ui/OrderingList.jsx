import React, { useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  DndContext,
  closestCenter,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const OrderingList = ({ options, onChange }) => {
  const [answerOptions, setAnswerOptions] = useState(options);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    })
  );

  const handleDragEnd = async (event) => {
    try {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = answerOptions.findIndex((item) => item === active.id);
      const newIndex = answerOptions.findIndex((item) => item === over.id);

      const newOptions = arrayMove(answerOptions, oldIndex, newIndex);
      await onChange(newOptions);
      setAnswerOptions(newOptions);
    } catch (err) {
      console.error("Error drag item in order", err);
    }
  };
  const SortableItem = ({ id, text }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-white border flex flex-row items-center min-h-[20px] sm:min-h-[50px] border-[#E4E4E4] rounded-md shadow-sm cursor-grab py-0 px-3"
      >
        <img src="/assets/icons/ordering-item-icon.svg" className="w-4 h-4" />
        <span className="ml-6">{text}</span>
      </div>
    );
  };

  return (
    <div className="bg-[#F3F4F6] p-6 w-full rounded-2xl border border-solid border-[#E4E4E4] mt-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={answerOptions}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-3">
            {answerOptions.map((option) => (
              <SortableItem key={option} id={option} text={option} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default OrderingList;