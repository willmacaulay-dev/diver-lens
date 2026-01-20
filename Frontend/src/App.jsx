import { HashRouter, Route, Routes } from 'react-router'
import { useEffect } from 'react'
import './App.css'
import Home from './components/Home'
import PublishProfile from './components/Publish/PublishProfile'
import Explore from './components/Explore/Explore'
import AquariumBuilder from './components/AquariumBuilder/AquariumBuilder'
import ViewProfiles from './components/Publish/ViewProfiles'

import exploreTab from "./data/ui/explore_tab.png";
import buildTab from "./data/ui/build_tab.png";
import profilesTab from "./data/ui/profiles_tab.png";
import tabsBackground from "./data/ui/tabs_background.png";

function App() {

	useEffect(() => {
		const urls = [tabsBackground, exploreTab, buildTab, profilesTab];
		urls.forEach((src) => {
			const img = new window.Image();
			img.src = src;
		});
	}, []);

	return <HashRouter>
		<Routes>
			<Route path="/" element={ <Home/> }/>
			<Route path="/view-profiles" element={ <ViewProfiles/> }/>
			<Route path="/publish-profile" element={ <PublishProfile/> }/>
			<Route path="/explore" element={ <Explore/> }/>
			<Route path="/aquarium-builder" element={ <AquariumBuilder/> }/>
		</Routes>
	</HashRouter>
}

export default App
