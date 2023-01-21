import { useState } from "react";
import TransferListActionButton from "src/TransferList/components/ActionButton";
import TransferListBasket, {
  TransferListBasketItem,
} from "src/TransferList/components/List";
import styles from "./TransferList.module.scss";

const DEFAULT_ITEMS: TransferListBasketItem[] = [
  "JS",
  "HTML",
  "CSS",
  "TS",
  "React",
  "Angular",
  "Vue",
  "Svetle",
].map((item, index) => ({ id: index, label: item, checked: false }));

export function TransferList() {
  const [itemsBaskets, setItemsBaskets] = useState<TransferListBasketItem[][]>([
    DEFAULT_ITEMS.slice(0, DEFAULT_ITEMS.length / 2),
    DEFAULT_ITEMS.slice(DEFAULT_ITEMS.length / 2),
  ]);

  const isAnyItemChecked = (basket: number) =>
    itemsBaskets[basket].some(({ checked }) => checked);
  const isListEmpty = (basket: number) => itemsBaskets[basket].length === 0;

  function handleToggleList(id: number, basket: number) {
    itemsBaskets[basket].every((item, index) => {
      // Find matching item.
      if (item.id === id) {
        // Toggle checked, update state, and exit the loop.
        itemsBaskets[basket][index].checked = !item.checked;
        setItemsBaskets([...itemsBaskets]);

        return false;
      }
      return true;
    });
  }

  function handleTransfer(
    source: number,
    destination: number,
    transferAll = false
  ) {
    const itemsBasketsCopy = [...itemsBaskets];

    if (transferAll) {
      itemsBaskets[source] = [];
      // Desctucture copy of state, so that we can preserve checked property.
      itemsBaskets[destination] = [
        ...itemsBasketsCopy[0],
        ...itemsBasketsCopy[1],
      ];
    } else {
      const stateItemsSourceCopy = [...itemsBaskets[source]];
      // Remove checked items from source.
      itemsBaskets[source] = itemsBaskets[source].filter(
        ({ checked }) => !checked
      );
      // Add checked items from source copy into the destination.
      itemsBaskets[destination] = itemsBaskets[destination].concat(
        stateItemsSourceCopy.filter(({ checked }) => checked)
      );
    }

    setItemsBaskets(
      itemsBaskets.map((items) =>
        items.map((item) => ({
          ...item,
          /**
           * If the initial state destination includes the item,
           * we want to preserve the checked property,
           * otherwise uncheck the item.
           */
          checked: itemsBasketsCopy[destination].includes(item)
            ? item.checked
            : false,
        }))
      )
    );
  }

  return (
    <div className={styles.container}>
      <TransferListBasket
        items={itemsBaskets[0]}
        onItemToggle={(id) => handleToggleList(id, 0)}
      />
      <div className={styles.actions}>
        <TransferListActionButton
          disabled={isListEmpty(1)}
          onClick={() => handleTransfer(1, 0, true)}
          src="/svgs/expand-left-double.svg"
          title="Move all"
          alt="Move all to first list"
        />
        <TransferListActionButton
          disabled={!isAnyItemChecked(1)}
          onClick={() => handleTransfer(1, 0, false)}
          src="/svgs/expand-left.svg"
          title="Move checked"
          alt="Move selected to first list"
        />
        <TransferListActionButton
          disabled={!isAnyItemChecked(0)}
          onClick={() => handleTransfer(0, 1, false)}
          src="/svgs/expand-right.svg"
          title="Move checked"
          alt="Move selected to second list"
        />
        <TransferListActionButton
          disabled={isListEmpty(0)}
          onClick={() => handleTransfer(0, 1, true)}
          src="/svgs/expand-right-double.svg"
          title="Move all"
          alt="Move all to second list"
        />
      </div>
      <TransferListBasket
        items={itemsBaskets[1]}
        onItemToggle={(id) => handleToggleList(id, 1)}
      />
    </div>
  );
}
export default TransferList;
