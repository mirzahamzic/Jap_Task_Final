using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace JapTask1.Common.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Units
    {
        Kg, Gr, L, Ml, kom
    }
}
