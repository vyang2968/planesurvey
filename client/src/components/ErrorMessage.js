export default function ErrorMessage({ error, className }) {
    return (
        <div className={className}>
            {!!error && <p>{error?.message}</p>}
        </div>
    )
}