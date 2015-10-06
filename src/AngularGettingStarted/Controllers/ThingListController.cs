using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using AngularGettingStarted.Models;
using System.Net;

namespace AngularGettingStarted.Controllers
{
    [Route("api/[controller]")]
    [ResponseCache(NoStore = true)]
    public class ThingListController : Controller
    {
        private static Dictionary<string, Thing> s_thingDetails = new Dictionary<string, Thing>();

        // Get the IDs of all things
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return s_thingDetails.Keys;
        }

        // Create a new thing
        [HttpPost]
        public IActionResult Post([FromBody]Thing thing)
        {
            // If this thing already exists, return a 409 Conflict.
            if (s_thingDetails.ContainsKey(thing.Value))
            {
                return new HttpStatusCodeResult((int)HttpStatusCode.Conflict);
            }
            s_thingDetails[thing.Value] = thing;
            // Just return an empty OK to say we've done what was asked.
            return new HttpOkResult();
        }

        // Get the full detail of an existing thing.
        [HttpGet("{thing}")]
        public IActionResult Get(string thing)
        {
            // If we don't know about thing, return a not found.
            if (!s_thingDetails.ContainsKey(thing)) return HttpNotFound();
            // Return the full object.
            return new ObjectResult(s_thingDetails[thing]);
        }

        // Update an existing thing.
        [HttpPut("{thing}")]
        public IActionResult Put(string thing, [FromBody] Thing thingWithDetail)
        {
            // If we don't know about thing, return a HTTP 404 not found.
            if (!s_thingDetails.ContainsKey(thing)) return HttpNotFound();

            // Update the details using the thing we've had sent in.
            s_thingDetails[thing] = thingWithDetail;

            // Return a representation of what we've updated.
            return new ObjectResult(s_thingDetails[thing]);
        }

        // Delete an existing thing.
        [HttpDelete("{thing}")]
        public IActionResult Delete(string thing)
        {
            // If we don't know about thing, return a not found.
            if (!s_thingDetails.ContainsKey(thing)) return HttpNotFound();

            s_thingDetails.Remove(thing);
            return new HttpOkResult();
        }
    }
}
