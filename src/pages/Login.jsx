import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner'; // Assuming you create a Spinner component

function Login() {
  // ... other component logic

  const { isLoading, isError, message } = useSelector((state) => state.auth);

  // In your JSX form:
  return (
    <>
      {isLoading && <Spinner />}
      {isError && <div className='error'>{message}</div>}
      <form onSubmit={onSubmit}>
        {/* ... form inputs */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </>
  )
}