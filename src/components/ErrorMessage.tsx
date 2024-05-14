const ErrorMessage: React.FC<{message : string}> = ({message}) => {
    return (
      <p className="font-bold text-2xl text-red-600">
        {message}
      </p>
    )
}

export default ErrorMessage
