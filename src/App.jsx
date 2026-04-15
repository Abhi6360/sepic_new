import { Switch, Route } from 'wouter'
import Home from './pages/Home'
import Analysis from './pages/Analysis'
import PCBDesign from './pages/PCBDesign'
import DFX from './pages/DFX'
import LibrarySupport from './pages/LibrarySupport'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/analysis" component={Analysis} />
          <Route path="/pcb-design" component={PCBDesign} />
          <Route path="/dfx" component={DFX} />
          <Route path="/library-support" component={LibrarySupport} />
          <Route>
            <div style={{ textAlign: 'center', padding: '12rem 2rem', color: '#f7f9ff', minHeight: '80vh' }}>
              <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>404_NOT_FOUND</h1>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The requested schematic could not be located.</p>
              <a href="/" className="btn-primary">Return to Base</a>
            </div>
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  )
}
