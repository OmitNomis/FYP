import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ForgotPassword from "../screens/ForgotPassword";
import ConfirmationMail from "../screens/ConfirmationMail";
import Home from "../screens/Home";
import Chat from "../screens/Chat";
import Profile from "../screens/Profile";
import colors from "../assets/theme/colors";
import Settings from "../screens/Settings";
import ChangePassword from "../screens/ChangePassword";
import About from "../screens/About";
import SafetyTips from "../screens/SafetyTips";
import ContactUs from "../screens/ContactUs";
import SoldItems from "../screens/SoldItems";
import MyListings from "../screens/MyListings";
import Bookmarks from "../screens/Bookmarks";
import AddBook from "../screens/AddBook";
import Book from "../screens/Book";
import EditBook from "../screens/EditBook";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const noHeader = { headerShown: false };
const headerShown = {
  headerStyle: {
    backgroundColor: colors.Primary,
  },
  headerTitleAlign: "center",
  headerShown: true,
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontFamily: "Regular",
    fontWeight: "600",
    fontSize: 24,
  },
};
function HomeStack(props) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Home") {
            focused ? (iconName = "home") : (iconName = "home-outline");
          } else if (route.name === "Chat") {
            focused
              ? (iconName = "chatbox-ellipses")
              : (iconName = "chatbox-ellipses-outline");
          } else if (route.name === "Profile") {
            focused
              ? (iconName = "person-circle")
              : (iconName = "person-circle-outline");
          }

          return <Icon name={iconName} size={25} color={color} />;
        },
        tabBarInactiveTintColor: "rgba(255,255,255,0.7)",
        tabBarActiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: colors.Purple,
          paddingBottom: 10,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={noHeader} />
      <Tab.Screen name="Chat" component={Chat} options={headerShown} />
      <Tab.Screen name="Profile" component={Profile} options={noHeader} />
    </Tab.Navigator>
  );
}
function ScreenStack(props) {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={Settings} options={noHeader} />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={headerShown}
      />
      <Stack.Screen name="About" component={About} options={headerShown} />
      <Stack.Screen
        name="SafetyTips"
        component={SafetyTips}
        options={headerShown}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={headerShown}
      />
      <Stack.Screen
        name="SoldItems"
        component={SoldItems}
        options={headerShown}
      />
      <Stack.Screen
        name="MyListings"
        component={MyListings}
        options={headerShown}
      />
      <Stack.Screen
        name="Bookmarks"
        component={Bookmarks}
        options={headerShown}
      />
    </Stack.Navigator>
  );
}

function SignInStack(props) {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={noHeader} />
      <Stack.Screen name="Register" component={Register} options={noHeader} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={noHeader}
      />
      <Stack.Screen
        name="ConfirmationMail"
        component={ConfirmationMail}
        options={noHeader}
      />
      <Stack.Screen name="HomeStack" component={HomeStack} options={noHeader} />
      <Stack.Screen
        name="Settings"
        component={ScreenStack}
        options={noHeader}
      />
      <Stack.Screen name="AddPost" component={AddBook} options={headerShown} />
      <Stack.Screen
        name="EditBook"
        component={EditBook}
        options={headerShown}
      />
      <Stack.Screen name="Book" component={Book} options={headerShown} />
    </Stack.Navigator>
  );
}

export default function AppRoute(props) {
  return <SignInStack {...props} />;
}
