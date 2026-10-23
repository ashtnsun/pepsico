import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page-head" style={{ paddingBottom: 120 }}>
      <h1 className="h1">Page not found</h1>
      <p>This page doesn’t exist or the promotion has been removed.</p>
      <p style={{ marginTop: 24 }}><Link to="/" className="btn btn--primary">Go to homepage</Link></p>
    </div>
  )
}
