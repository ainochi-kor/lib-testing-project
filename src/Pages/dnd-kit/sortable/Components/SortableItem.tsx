import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import styled from '@emotion/styled';
import { CSS } from '@dnd-kit/utilities';
import { UniqueIdentifier } from '@dnd-kit/core';

interface IItem {
  id: UniqueIdentifier;
}

const Item = ({ id }: IItem) => {
  return <ItemWrapper>{id}</ItemWrapper>;
};

const SortableItem = ({ id }: { id: UniqueIdentifier }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const SortableItemWrapper = styled.div`
    transform: CSS.Transform.toString(${transform}), ${transition};
  `;

  return (
    <SortableItemWrapper ref={setNodeRef} {...attributes} {...listeners}>
      <Item id={id} />
    </SortableItemWrapper>
  );
};

export default SortableItem;

const ItemWrapper = styled.div`
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    margin: "10px 0",
    background: "white"
}
`;
