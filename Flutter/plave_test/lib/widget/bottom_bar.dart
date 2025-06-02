import 'package:flutter/material.dart';

class BottomBar extends StatelessWidget {
  const BottomBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black,
      child: Container(
        height: 50,

        child: TabBar(
          labelColor: Colors.white,
          unselectedLabelColor: Colors.white60,
          indicatorColor: Colors.transparent,

          tabs: <Widget>[
            Tab(
              icon: Icon(Icons.home, size: 18,),
              child: Text('홈', style: TextStyle( fontSize: 9),),
            ),
            
            Tab(
              icon: Icon(Icons.search, size: 18,),
              child: Text('검색', style: TextStyle( fontSize: 9),),
            ),

            Tab(
              icon: Icon(Icons.favorite_border_outlined, size: 18,),
              child: Text('좋아요', style: TextStyle( fontSize: 9),),
            ),

            Tab(
              icon: Icon(Icons.list, size: 18,),
              child: Text('더보기', style: TextStyle( fontSize: 9),),
            ),
          ],

        ),

      ),
    );
  }
}