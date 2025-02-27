import './App.css';
import Engine from './components/Engine';
import EnergySwitch from './components/EnergySwitch';
import RateMonitor from './components/RateMonitor';
import { ENGINES, useBattery, useEnergySource, useTransfer } from '@sgty/hooked';


function App() {
	const energySource = useEnergySource();
	const battery = useBattery();

	useTransfer(energySource, battery, 0.4);

	return (
		<div>
			<div style={{ display: 'flex', gap: '24px' }}>
				Energy: {energySource.$.display(v => v.toFixed(2))}
				Battery: {battery.$.display(v => v.toFixed(2))}
				Engines: {ENGINES.total$.display(v => v.toFixed(2))}
			</div>

			<EnergySwitch in={battery}>
				battery charge rate: <RateMonitor consumable={battery} />

				<Engine>
					battery!
				</Engine>
			</EnergySwitch>

			<Engine />
		</div>
	)
}

export default App
