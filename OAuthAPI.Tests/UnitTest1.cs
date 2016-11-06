using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;
using OAuthAPI.WebApi.Api.Identity.Controllers;

namespace OAuthAPI.Tests
{
    [TestFixture]
    public class UnitTest1
    {
        [Test]
        public void TestMethod1()
        {
            Assert.AreEqual(1, 1);
        }

        [Test]
        public void TestMethod2()
        {
            var controller = new TestController();
            
        }
    }
}