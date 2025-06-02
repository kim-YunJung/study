import 'package:flutter/material.dart';
import 'package:plave_test/model/model_movie.dart';
import 'package:plave_test/screen/detail_screen.dart';

class BoxSlider extends StatelessWidget {
  final List<Movie> movies;

  BoxSlider(this.movies);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(7),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text('멤버간 케미'),
          Container(
            margin: EdgeInsets.fromLTRB(0, 10, 0, 10),
            height: 120,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: makeBoxImages(context, movies),
            ),
          )
        ],
      ),
    );
  }
}

List<Widget> makeBoxImages(BuildContext context, List<Movie> movies){
  List<Widget> results = [];

  for(var i = 0; i < movies.length; i++){
    results.add(
      InkWell(
        onTap: (){
          Navigator.of(context).push(
            MaterialPageRoute(
              fullscreenDialog: true,
              builder: (context) => DetailScreen(movies[i])
            ),                            
          );
        },
        child: Container(
          padding: EdgeInsets.only(right: 10),
          child: Align(
            alignment: Alignment.centerLeft,
            child: Align(
              alignment: Alignment.centerLeft,
              child: Stack(
                alignment: Alignment.bottomCenter,
                children: [
                  Image.asset(movies[i].poster),
                  Container(
                    margin: EdgeInsets.only(bottom: 3),
                    padding: EdgeInsets.fromLTRB(5, 2, 5, 2),
                    decoration: BoxDecoration(
                      color: Colors.black38,
                      borderRadius: BorderRadius.circular(2)
                    ),
                    child: Text(
                      movies[i].title,
                      style: TextStyle(
                        fontSize: 14, 
                        color: Colors.white,
                      ),                      
                    ),
                  )
                ],
              )
            ),
          ),
        ),
      )
    );
  }    
  
  return results;
}