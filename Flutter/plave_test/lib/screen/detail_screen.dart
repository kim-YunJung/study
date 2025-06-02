import 'package:flutter/material.dart';
import 'dart:ui';
import 'package:plave_test/model/model_movie.dart';
 
class DetailScreen extends StatefulWidget {
  final Movie movie;

  DetailScreen(this.movie);

  @override
  State<DetailScreen> createState() => _DetailScreenState();
}

class _DetailScreenState extends State<DetailScreen> {
  bool like = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: Container(
      
        child: SafeArea(

          child: ListView(
            
            children: <Widget>[
              Stack(
                children: <Widget>[

                  Container(
                    width: double.maxFinite,
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: AssetImage(widget.movie.poster),
                        fit: BoxFit.cover,
                      )
                    ),

                    child: ClipRRect(
                      child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                        child: Container(
                          alignment: Alignment.center,
                          color: Colors.black.withOpacity(0.1),
                          
                          child: Container(
                            child: Column(
                              children: <Widget>[

                                Container(
                                  padding: EdgeInsets.fromLTRB(0, 45, 0, 10),
                                  child: Image.asset(widget.movie.poster,),
                                  height: 300,
                                ),

                                Container(
                                  padding: EdgeInsets.all(7),
                                  child: Text(
                                    widget.movie.title,
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 16,
                                    ),
                                  ),
                                ),

                                Container(
                                  padding: EdgeInsets.all(7),
                                  child: Text(
                                    '추가 설명들어 갈 예정',
                                    textAlign: TextAlign.center,
                                    style: TextStyle(fontSize: 13),
                                  ),
                                ),
                                
                                Container(
                                  padding: EdgeInsets.all(5),
                                  alignment: Alignment.centerLeft,
                                  child: Text(
                                    '추가 설명들어 갈 예정',
                                    style: TextStyle(fontSize: 11, color: Colors.white60),
                                  ),
                                ),
                              ],      
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),

                  Positioned(
                    child: AppBar(
                      backgroundColor: Colors.transparent,
                      elevation: 0,
                    ),
                  ),
                ],
              ),

              Container(
                color: Colors.black26,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Container(
                      padding: EdgeInsets.fromLTRB(20, 10, 20, 10),
                      child: InkWell(
                        onTap: (){},
                        child: Column(
                          children: [
                            like ? Icon(Icons.favorite) : Icon(Icons.favorite_border_outlined),
                            Padding(padding: EdgeInsets.all(5)),
                            Text(
                              '좋아요',
                              style: TextStyle(
                                fontSize: 11,
                                color: Colors.white60
                              ),
                            )
                          ],
                        ),
                      ),
                    ),

                    Container(
                      padding: EdgeInsets.fromLTRB(20, 10, 20, 10),
                      child: InkWell(
                        onTap: (){},
                        child: Column(
                          children: [
                            Icon(Icons.send),
                            Padding(padding: EdgeInsets.all(5)),
                            Text(
                              '공유',
                              style: TextStyle(
                                fontSize: 11,
                                color: Colors.white60
                              ),
                            )
                          ],
                        ),
                      ),
                    ),

                  ],
                ),
              )
              
              //makeMenuButton(),
            ],
          ),
        ),
      ),
    );
  }
}
