interface ItemProps {
  action: (newQuantity: number) => Promise<void>;
}

export default function Item({action}: ItemProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    action(Number(event.target.value));
  }
  return (
    <div className="item">
      <span>Eras Tour Tickets</span>
      <label htmlFor="name">Quantity: </label>
      <input
        type="number"
        onChange={handleChange}
        defaultValue={1}
        min={1}
      />
    </div>
  )
}
