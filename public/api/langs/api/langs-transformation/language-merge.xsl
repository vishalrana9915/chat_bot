<?xml version="1.0" encoding="UTF-8"?>
<!-- edited with XMLSpy v2010 rel. 3 sp1 (x64) (http://www.altova.com) by Shawn S Miller (private) -->
<!-- Merge two XML files
     When run with your Original LangXml as the input and with the [the-update].xml present in the same folder-->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" indent="yes"/>

    <xsl:param name="fileName" select="'translations.xml'" />
    <xsl:param name="updates" select="document($fileName)" />

    <xsl:variable name="updateKeys" select="$updates/lang/key" />

    <xsl:template match="@* | node()">
        <xsl:copy>
            <xsl:apply-templates select="@* | node()"/>
        </xsl:copy>
    </xsl:template>

    <xsl:template match="lang">
        <xsl:copy>
            <xsl:apply-templates select="key[not(@value = $updateKeys/@value)]" />
            <xsl:apply-templates select="$updateKeys" />
        </xsl:copy>
    </xsl:template>

</xsl:stylesheet>
