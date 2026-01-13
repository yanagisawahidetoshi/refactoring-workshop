const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

interface TotalProps {
  quantity: number;
  isPending: boolean;
}

export default function Total({quantity, isPending}: TotalProps) {
  return (
    <div className="total">
      <span>Total:</span>
      <span>
        {isPending ? "🌀 Updating..." : `${intl.format(quantity * 9999)}`}
      </span>
    </div>
  )
}
