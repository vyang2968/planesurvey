export default function ErrorMessage({ error, style }) {
    return (
        <div className={style}>
            {!!error && <p>{error?.message}</p>}
        </div>
    )
}