// Tabs render through expo-router's `Tabs`, but the bar is fully custom so we
// can inject the floating scan button and the dot indicator from the design.

import { Tabs } from 'expo-router';
import { MarigoldTabBar } from '@/components/TabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <MarigoldTabBar active={routeKey(props.state.routes[props.state.index].name)} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="library" />
      <Tabs.Screen name="journal" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

function routeKey(name: string): string {
  if (name === 'index') return 'home';
  return name;
}
