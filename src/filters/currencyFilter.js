export default function(value, currency = 'KZT') {
  return new Intl.NumberFormat('kz-KZ', {
    style: 'currency',
    currency
  }).format(value)
}