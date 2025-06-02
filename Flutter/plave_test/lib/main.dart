import 'package:flutter/material.dart';

import 'package:plave_test/screen/home_screen.dart';
import 'package:plave_test/screen/more_screen.dart';

import 'package:plave_test/widget/bottom_bar.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PlaveFilx',
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: Colors.black,
      ),

      home: DefaultTabController(
        length: 4, 
        child: Scaffold(
          body: TabBarView(
            physics: NeverScrollableScrollPhysics(),
            children: <Widget>[
              HomeScreen(),

              Container(
                child: Center(child: Text('search'),),
              ),
              
              Container(
                child: Center(child: Text('save'),),
              ),
              
              MoreScreen(),
            ],
          ),

          bottomNavigationBar: BottomBar(),
        )
      ),

    );
  }
}