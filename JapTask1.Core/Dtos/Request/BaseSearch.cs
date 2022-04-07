using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapTask1.Core.Dtos.Request
{
    public class BaseSearch
    {
        public int? Limit
        {
            get
            {
                return (Page - 1) * PageSize;
            }
        }
        public int? Page { get; set; }
        public int? PageSize { get; set; }
    }
}
