import React from 'react'


/*im thinking that we may need a post component like this so we can reuse it on the
home page and the profile page. we feed it the post data we grab into the return here and render it for each post
*/
const PostComponent = () => {
    //this will need props, they should come from the
    //parent component, this is a child of to determine what 
    //posts we need to show


    /*
    ex: if we are on the homepage then show all most recent posts,
    but if we are on the profile page then show only posts that are from the given profile
    This could be done with some fetch trickery */

    /*
    something like:
    let response = await fetch('https://localhost/api/${props.profileId}/posts')
    let posts = await response.json()

    then map the data to an array and iterate through generating new html (jsx) elements filling in the data
     */
  return (
    <div>PostComponent</div>
  )
}

export default PostComponent