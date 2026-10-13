// Tabs render through expo-router's `Tabs`, but the bar is fully custom so we
// can label every icon and raise the centre "Can I?" button.

import { Tabs } from 'expo-router';
import { MarigoldTabBar } from '@/components/TabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <MarigoldTabBar active={props.state.routes[props.state.index].name} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="weeks" />
      <Tabs.Screen name="check" />
      <Tabs.Screen name="journal" />
      <Tabs.Screen name="tools" />
    </Tabs>
  );
}
