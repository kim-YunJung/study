import 'package:flutter/material.dart';
import 'package:flutter_linkify/flutter_linkify.dart';
import 'package:url_launcher/url_launcher.dart';

class MoreScreen extends StatefulWidget {
  const MoreScreen({super.key});

  @override
  State<MoreScreen> createState() => _MoreScreenState();
}

class _MoreScreenState extends State<MoreScreen> {
  @override
  Widget build(BuildContext context) {
    return Container(

      child: Center(        
        child: Column(          
          children: [
            Container(
                padding: EdgeInsets.only(top: 50),
                child: CircleAvatar(
                  radius: 100,
                  backgroundImage: AssetImage('assets/images/all/plave_dance.gif'),
                ),
              ),

              Container(
                padding: EdgeInsets.only(top: 15),
                child: Text(
                  'PLAVE',
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 25,
                      color: Colors.white),
                ),
              ),

              Container(
                child: Align(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [                      
                      TextButton(                    
                        style: TextButton.styleFrom(
                        textStyle: 
                          TextStyle(
                            fontSize : 11, 
                            color: Colors.white, 
                          ),                      
                        ),
                        onPressed: () async {
                          Uri? url = Uri.tryParse("https://cafe.daum.net/plave");
                          /* https://docs.flutterflow.io/ */
                          await launchUrl(url as Uri);
                        },
                        child: Text('Cafe', style: TextStyle(color: Colors.white)),
                      ),

                      TextButton(                    
                        style: TextButton.styleFrom(
                        textStyle: 
                          TextStyle(
                            fontSize : 11, 
                            color: Colors.white, 
                          ),                      
                        ),
                        onPressed: () async {
                          Uri? url = Uri.tryParse("https://www.youtube.com/@plave_official");
                          /* https://docs.flutterflow.io/ */
                          await launchUrl(url as Uri);
                        },
                        child: Text('Youtube', style: TextStyle(color: Colors.white)),
                      ),

                      TextButton(                    
                        style: TextButton.styleFrom(
                        textStyle: 
                          TextStyle(
                            fontSize : 11, 
                            color: Colors.white, 
                          ),                      
                        ),
                        onPressed: () async {
                          Uri? url = Uri.tryParse("https://www.instagram.com/plave_official/");
                          /* https://docs.flutterflow.io/ */
                          await launchUrl(url as Uri);
                        },
                        child: Text('Instagram', style: TextStyle(color: Colors.white)),
                      ),
                    ],
                  )
                ),
              ),
              
            Container(
              padding: EdgeInsets.fromLTRB(10, 40, 10, 20),
                child: Column(                  
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Container( 
                      child: SelectableLinkify(
                        onOpen: (link) async {
                            if (!await launchUrl(Uri.parse(link.url))) {
                              throw Exception('Could not launch ${link.url}');
                            }
                          },
                          text: "음원총공팀 \n https://plavestream.com",
                          style: TextStyle(color: Colors.yellow, fontSize: 12),
                          linkStyle: TextStyle(color: Colors.white, fontSize: 11), 
                      ),    
                    ),

                    Container(
                      child: SelectableLinkify(
                        onOpen: (link) async {
                            if (!await launchUrl(Uri.parse(link.url))) {
                              throw Exception('Could not launch ${link.url}');
                            }
                          },
                          text: "포토카드 리스트 \n https://www.weareplave.com/",
                          style: TextStyle(color: Colors.yellow, fontSize: 12),
                          linkStyle: TextStyle(color: Colors.white, fontSize: 11), 
                      ),    
                    ),     

                    Container(
                      child: SelectableLinkify(
                          onOpen: (link) async {
                              if (!await launchUrl(Uri.parse(link.url))) {
                                throw Exception('Could not launch ${link.url}');
                              }
                            },
                            text: "플레이브 기달릴게 팬 만화 \n https://www.postype.com/@e9utart-plaveart/post/16351161",
                            style: TextStyle(color: Colors.yellow, fontSize: 12),
                            linkStyle: TextStyle(color: Colors.white, fontSize: 11), 
                        ),   
                    ),
       
                ],
              )
            )
          ], 
        ),

      ),
    );
  }
  
}