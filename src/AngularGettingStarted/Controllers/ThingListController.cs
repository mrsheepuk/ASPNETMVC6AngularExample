using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using AngularGettingStarted.Models;

namespace AngularGettingStarted.Controllers
{
    [Route("api/[controller]")]
    [ResponseCache(NoStore = true)]
    public class ThingListController : Controller
    {
        private static List<string> s_thingList = new List<string>();

        [HttpGet]
        public List<string> Get()
        {
            return s_thingList;
        }

        [HttpPost]
        public void Post([FromBody]Thing thing)
        {
            s_thingList.Add(thing.Value);
        }

        [HttpDelete("{thing}")]
        public void Delete(string thing)
        {
            s_thingList.Remove(thing);
        }
    }
}
