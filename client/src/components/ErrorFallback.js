import classNames from "classnames";

export default function ErrorFallback({ message, className}) {
    return(
        <div className={classNames(
            "",
            className
        )}>
            {message}
        </div>
    )
}