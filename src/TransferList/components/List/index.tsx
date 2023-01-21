import { Checkbox } from "src/components/Checkbox";
import styles from "src/TransferList/components/List/List.module.scss";

export interface TransferListBasketItem {
  id: number;
  label: string;
  checked: boolean;
}
interface TransferListBasketProps {
  items: TransferListBasketItem[];
  onItemToggle: (id: number) => void;
}

export function TransferListBasket({
  items,
  onItemToggle,
}: TransferListBasketProps) {
  return (
    <ul className={styles.list}>
      {items.map(({ id, label, checked }) => (
        <li className={styles.item} key={id}>
          <Checkbox
            label={label}
            checked={checked}
            onChange={() => onItemToggle(id)}
          />
        </li>
      ))}
    </ul>
  );
}
export default TransferListBasket;
