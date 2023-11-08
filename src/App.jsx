import Carlist from './components/Carlist'
import { AppBar, Typography } from '@mui/material'

function App() {
  return (
    <>
      <AppBar position="sticky">
        <Typography variant="h6">
          Car Shop
        </Typography>
      </AppBar>
      <Carlist />
    </>
  )
}

export default App
