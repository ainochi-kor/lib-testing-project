import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import styled from '@emotion/styled';
import SortableItem from './SortableItem';

interface ISortableContainer {
  id: string;
  items: any;
}

const SortableContainer = ({ id, items }: ISortableContainer) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
      <SortableContainerWrapper ref={setNodeRef}>
        {items.map((id: string) => (
          <SortableItem key={id} id={id} />
        ))}
      </SortableContainerWrapper>
    </SortableContext>
  );
};

export default SortableContainer;

const SortableContainerWrapper = styled.div`
  background: "#dadada",
  padding: 10,
  margin: 10,
  flex: 1
`;
