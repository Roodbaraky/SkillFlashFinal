
import { PropsWithChildren, useState } from "react";
import {TouchableOpacity, View,Text, Animated } from "react-native";
import styles from "@/styling/style";
import React from "react";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.newDeckTagListContainer}>
      <TouchableOpacity
        style={styles.mediumTitle}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        
        <Text style={styles.newDeckCategoryName} >{title}</Text>
      </TouchableOpacity>
      {isOpen && <Animated.View style={styles.tagsContainer}>{children}</Animated.View>}
    </View>
  );
}


