import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import styled from '@emotion/styled';
import { type } from 'os';
import { useState } from 'react';
import SortableContainer from './Components/SortableContainer';
import SortableItem from './Components/SortableItem';

const SortableIndx = () => {
  const [activeId, setActiveId] = useState<UniqueIdentifier>();
  const [items, setItems] = useState<{
    [key: string]: string[];
  }>({
    root: ['1', '2', '3'],
    container1: ['4', ' 5', '6'],
    container2: ['7', '8', '9'],
    container3: [],
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key: string) => items[key].includes(id.toString()));
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const id = active.id.toString();
    const overId = over?.id;

    if (!overId) return;

    // 컨테이너 찾기
    const activeContainer = findContainer(id);
    const overContainer = findContainer(over?.id);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // 각 아이템의 인덱스 찾기
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId.toString());

      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length + 1;
      } else {
        const activeTop = active.rect.current.translated?.top ?? 0;

        const isBelowLastItem =
          over && overIndex === overItems.length - 1 && activeTop > over.rect.top + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [...prev[activeContainer].filter((item) => item !== active.id)],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const id = active.id.toString();
    const overId = over?.id;

    if (!overId) return;

    // 컨테이너 찾기
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(id);
    const overIndex = items[overContainer].indexOf(overId.toString());

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
      }));
    }
    setActiveId(undefined);
  };

  return (
    <Wrapper>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContainer id='root' items={items.root} />
        <SortableContainer id='container1' items={items.container1} />
        <SortableContainer id='container2' items={items.container2} />
        <SortableContainer id='container3' items={items.container3} />
        <DragOverlay>{activeId ? <SortableItem id={activeId} /> : null}</DragOverlay>
      </DndContext>
    </Wrapper>
  );
};

export default SortableIndx;

const Wrapper = styled.div`
  dispaly: flex;
  flexdirection: 'row';
`;
