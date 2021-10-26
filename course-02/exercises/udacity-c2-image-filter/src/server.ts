import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  /**************************************************************************** */
  app.get( "/filteredimage", ( req: Request, res: Response ) => {
    
    const isItImageURL = require('image-url-validator').default;
    const urlExists = require('url-exists-deep');

    let { image_url } = req.query;
    if ( !image_url) {
      return res.status(400).send(`image_url is required`);
    } else if (!isItImageURL(image_url)){
      return res.status(400).send(`${image_url} is not a image url. URL of an Image is required!`);
    }
    urlExists(image_url).then(function (exists: {href: any;}) {
      if (!exists) {
        return res.status(404).send(`The image file does not exists - ${image_url}`);
      } else{
        //Filter the image using helper function
        filterImageFromURL(image_url).then((photoData) => {
          //Return the filtered Image file
          return res.sendFile(photoData, {}, function (err){
            if(err){
              return res.status(500).send("Bad URL or something went wrong!");
            } else {
              //File was sent, so clean up using helper function DeleteLocalFiles
              deleteLocalFiles([photoData]).catch((errorDelete) => {
                if (errorDelete) {
                  return res.status(422).send(`The image in ${image_url} is bad! or corrupted`);
                }
              });
            }
          }); //end of Send File
        }); //end of FilterImageFromURL
      } //End of overall else
    }).catch((error: any) => {
      if(error){
        return res.status(500).send("Bad URL or something went wrong!");
      }
    });
  });
  //END
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();