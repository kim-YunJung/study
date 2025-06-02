import 'package:flutter/material.dart';

import 'package:flutter_plave/screen/home_screen.dart';
import 'package:flutter_plave/screen/like_screen.dart';
import 'package:flutter_plave/screen/more_screen.dart';
import 'package:flutter_plave/screen/search_screen.dart';
import 'package:flutter_plave/widget/bottom_bar.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  //TabController controller;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PlaveFlix',
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: Colors.black,
        colorScheme: ColorScheme.fromSwatch(primarySwatch: Colors.blue)
          .copyWith(secondary: Colors.white)
      ),

      home: DefaultTabController(
        length: 4,
        child: Scaffold(
          body: TabBarView(
            physics: NeverScrollableScrollPhysics(),
            children: <Widget>[
              HomeScreen(),
              SearchScreen(),
              LikeScreen(),
              MoreScreen(),
            ],
          ),

          bottomNavigationBar: Bottom(),
        ),
      ),
    );
  }
}
