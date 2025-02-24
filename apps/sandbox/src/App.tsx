import './App.css';
import { ENGINES } from './logic/hooks/game/engines';
import useEnergySource from './logic/hooks/game/useEnergySource';
import useConsumable from './logic/hooks/resource/useConsumable';
import useTransfer from './logic/hooks/resource/useTransfer';
import { Energy } from './logic/resources/energy';
import Engine from './components/Engine';
import EnergySwitch from './components/EnergySwitch';
import RateMonitor from './components/RateMonitor';



function App() {
	const energySource = useEnergySource();
	const battery = useConsumable(Energy, 2);

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
