using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularGettingStarted.Models
{
    public class EnvInfo
    {
        public bool Development { get; set; }
        public bool Production { get; set; }
        public string Version { get; set; }
    }
}
