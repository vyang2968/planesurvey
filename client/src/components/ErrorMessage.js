export default function ErrorMessage({ error, className }) {
    return (
        <div className={className}>
            {!!error && error?.message}
        </div>
    )
}